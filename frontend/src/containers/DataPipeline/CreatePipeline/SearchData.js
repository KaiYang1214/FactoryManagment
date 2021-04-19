import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Tag,
  message,
  Avatar,
  List,
  Select,
  Tooltip,
  Badge,
  Modal,
} from "antd";
import {
  FileDoneOutlined,
  EyeOutlined,
  PlusOutlined,
  CheckOutlined,
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { useQuery, useModal, useUpdateEffect, usePrevious } from "@/hooks";
import { AtlasApi, UserApi } from "@/apis";
import {
  TAB_KEY,
  SYSTEM_TYPE,
  PREVIEW_STATUS,
  CONSUME_STATUS,
  GROUP_TYPE,
} from "@/constants/index";
import { getParameterByName } from '@/utils/common';
import {
  PreviewModal,
  TermTable,
  ApplyModal,
  CartList,
  HealthDataModal,
  ReferenceChartModal,
  DeleteTableModal,
} from "./components";

import * as Style from "./searchDataStyle";

const SearchData = ({
  history,
  next,
  selectedColumns,
  setSelectedColumns,
  user,
  setGroupList,
  selectedGroup,
  setSelectedGroup,
  setSelectedGroupObject,
}) => {
  const urlKeyword = getParameterByName('keyword'); // get url keyword=?

  const [atlasContent, setAtlasContent] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [checking, setChecking] = useState([]);
  const [changeGroupList, setChangeGroupList] = useState([]);
  const [searchText, setSearchText] = useState(
    urlKeyword || ""
  );
  const [selectValue, setSelectValue] = useState("all");
  const [saveLoading, setSaveLoading] = useState(false);
  const [gridChange, setGridChange] = useState(false);
  const [initTemp, setInitTemp] = useState(true);
  const [page, setPage] = useState(1);

  const preSearchText = usePrevious(searchText);

  const previewModal = useModal();
  const applyModal = useModal();
  const healthDataModal = useModal();
  const deleteConfirmModal = useModal();
  const referenceChartModal = useModal();
  const deleteTableConfirmModal = useModal();

  const getGroupsQuery = useQuery(UserApi.getGroups);
  const getEntityListQuery = useQuery(AtlasApi.getEntityListFromAtlas);
  const saveSelectETL = useQuery(AtlasApi.saveSelectETL);
  const getSelectTable = useQuery(AtlasApi.getUserSelectTable);

  const getGroups = async () => {
    try {
      const result = await getGroupsQuery.exec({
        page: 1,
        pageSize: 9999,
        status: PREVIEW_STATUS.ALLOWED.value,
      });
      setChangeGroupList(result.groupListData);
      setGroupList(result.groupListData);
      const selfDefaultGroup = result.groupListData.find(
        (group) =>
          group.groupType === GROUP_TYPE.DEFAULT &&
          group.owner.toLowerCase() === user.emplId.toLowerCase()
      );
      if (selfDefaultGroup && !selectedGroup) {
        setSelectedGroup(selfDefaultGroup.groupId);
        setSelectedGroupObject(selfDefaultGroup);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveTable = async () => {
    setSaveLoading(true);
    const req = selectedColumns.map((st) => ({
      guid: st.guid,
      tableName: st.name,
    }));
    try {
      await saveSelectETL.exec({ tables: req, groupId: selectedGroup });
    } catch (e) {
      console.log(e);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSearch = async (data, groupId) => {
    if (!data || !groupId) {
      return;
    }
    setTableLoading(true);
    if (data !== "null") {
      history.push(
        data === ""
          ? "/app/pipeline/create"
          : `/app/pipeline/create?keyword=${encodeURIComponent(data.trim())}`
      );
    }
    try {
      const result = await getEntityListQuery.exec({ keyword: data, groupId });
      const entityList = [];
      if (result.tables && result.tables.length) {
        result.tables
          .filter((res) => res.consume !== CONSUME_STATUS.CONSUMEABLE)
          .filter((res) => res.systemType !== "WDL")
          .forEach((res) => {
            entityList.push(res);
          });
        if (preSearchText !== data) {
          setPage(1);
        }
      } else {
        message.success("No results found");
        setPage(1);
      }
      setAtlasContent(entityList);
    } catch (e) {
      console.log(e);
    } finally {
      setTableLoading(false);
    }
  };

  useUpdateEffect(() => {
    // 第一次進來畫面把temp table設定到購物車時不要進行save table動作
    if (!initTemp) {
      saveTable();
    }
  }, [selectedColumns]);

  useUpdateEffect(() => {
    if (searchText !== "null") {
      handleSearch(searchText, selectedGroup);
    }
  }, [selectedGroup]);

  const toggleSelectedRow = (changeRows, selected) => {
    const nextColumns = [].concat(selectedColumns);
    changeRows.forEach((record) => {
      const selObjIdx = nextColumns.findIndex(
        (sel) => sel.guid === record.guid
      );
      if (selected && selObjIdx === -1) {
        nextColumns.push({ ...record });
      } else if (!selected && selObjIdx !== -1) {
        nextColumns.splice(selObjIdx, 1);
      }
    });
    setSelectedColumns(nextColumns);
  };

  const getSelect = async () => {
    try {
      const result = await getSelectTable.exec();
      if (result.tables.length !== 0) {
        setSelectedGroup(result.groupId);
        setSelectedGroupObject({
          groupId: result.groupId,
          groupName: result.groupName,
        });
        toggleSelectedRow(result.tables, true);
      }
      setInitTemp(false);
    } catch (e) {
      console.log(e);
    }
  };

  const init = async () => {
    await getGroups();
    await getSelect();
  };

  useEffect(() => {
    init();
  }, [user]);

  const handlePreview = (row, e) => {
    previewModal.openModal(row);
    e.stopPropagation();
  };

  const handleDisplay = (data) => {
    const idx = selectedColumns.findIndex((item) => item.guid === data.guid);
    if (idx === -1) {
      return "list-item";
    }
    return "none";
  };

  const openApply = (row, e) => {
    applyModal.openModal(row);
    e.stopPropagation();
  };

  const openChart = (row, e) => {
    referenceChartModal.openModal(row);
    e.stopPropagation();
  };

  const openHealthData = (row) => healthDataModal.openModal(row);

  const handleUpdateName = (table, newName, previewState, updateType) => {
    const nextContent = [].concat(atlasContent);
    nextContent.forEach((c, idx) => {
      if (c.guid === table.guid) {
        nextContent[idx].name = newName;
        nextContent[idx].systemType =
          updateType !== undefined ? updateType : nextContent[idx].systemType;
        nextContent[idx].preview = previewState;
      }
    });
    setAtlasContent(nextContent);
  };

  const handleNext = () => {
    setAtlasContent([]);
    setChecking([]);
    setSearchText("");
    next(TAB_KEY.EXPLORE);
    setCartVisible(false);
  };

  const handleDataflowNext = () => {
    setAtlasContent([]);
    setChecking([]);
    setSearchText("");
    next(TAB_KEY.DATAFLOW);
  };

  const handleSelect = (value) => {
    setSelectValue(value);
  };

  const handleCart = () => {
    setCartVisible(true);
  };

  const handleClose = () => {
    setCartVisible(false);
  };

  const handleAddBtn = (item, e) => {
    toggleSelectedRow([item], true);
    e.stopPropagation();
  };

  const options = SYSTEM_TYPE.getOptionList().map((type) => ({
    value: type.key,
    label: type.name,
  }));

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={SYSTEM_TYPE.props[value].color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const ListButton = (item) => {
    const currGroup = getGroupsQuery.data.groupListData.find(
      (group) => group.groupId === selectedGroup
    );
    if (!currGroup) return null;
    if (item.preview === PREVIEW_STATUS.ALLOWED.value) {
      return (
        <Button
          onClick={(e) => handlePreview(item, e)}
          disabled={item.preview !== PREVIEW_STATUS.ALLOWED.value}
          title="Preview"
        >
          <EyeOutlined />
          {gridChange === false && "Preview"}
        </Button>
      );
    }
    // 只有group owner是自己時，才能做consume和apply
    if (currGroup.owner.toLowerCase() === user.emplId.toLowerCase()) {
      if (
        item.systemType === SYSTEM_TYPE.props.WisDOM.key ||
        item.systemType === SYSTEM_TYPE.props.WDC.key
      ) {
        return (
          <Button
            disabled={item.preview === PREVIEW_STATUS.APPLYING.value}
            onClick={(e) => openApply(item, e)}
            title="Apply"
          >
            <CheckOutlined />
            {gridChange === false &&
              (item.preview === PREVIEW_STATUS.APPLYING.value
                ? "Applying"
                : "Apply")}
          </Button>
        );
      }
      return null;
    }
    return null;
  };

  const handleGroupChange = (changedGroup) => {
    if (selectedColumns.length) {
      deleteConfirmModal.openModal(changedGroup);
    } else {
      setSelectedGroup(changedGroup);
      setSelectedGroupObject(
        changeGroupList.filter((i) => i.groupId === changedGroup)[0]
      );
    }
  };

  const handleDelete = () => {
    setSelectedColumns([]);
    setSelectedGroup(deleteConfirmModal.modalData);
    setSelectedGroupObject(
      changeGroupList.filter(
        (i) => i.groupId === deleteConfirmModal.modalData
      )[0]
    );
    deleteConfirmModal.closeModal();
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleDeleteTable = (e, item) => {
    e.stopPropagation();
    deleteTableConfirmModal.openModal(item);
  };

  return (
    <>
      <Style.ContainerBlock>
        {/* search長度不限 */}
        <Style.SearchDataInput
          disabled={!selectedGroup}
          onSearch={(text) => handleSearch(text, selectedGroup)}
          placeholder="Please enter a keyword to search columns or tables"
          enterButton
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <Style.Toolbar>
          <div>
            <span style={{ marginRight: "10px" }}>Group: </span>
            <Select
              disabled={!selectedGroup}
              loading={getGroupsQuery.isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              style={{ minWidth: "250px" }}
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              {getGroupsQuery.data.groupListData.map((d) => (
                <Select.Option key={d.groupId} value={d.groupId}>
                  {d.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>Location: </span>
            <Select
              style={{ minWidth: "180px" }}
              className="type-select"
              defaultValue={SYSTEM_TYPE.getOptionList().map((type) => type.key)}
              onChange={handleSelect}
              mode="multiple"
              tagRender={tagRender}
              options={options}
            />
          </div>
          <Button.Group style={{ marginLeft: "10px" }}>
            <Button onClick={() => setGridChange(true)}>
              <AppstoreOutlined />
            </Button>
            <Button onClick={() => setGridChange(false)}>
              <BarsOutlined />
            </Button>
          </Button.Group>
        </Style.Toolbar>

        <div style={{ paddingBottom: "14px" }}>
          <List
            grid={gridChange === true ? { gutter: 4 } : { gutter: 4, column: 1 }}
            pagination={{
              current: page,
              position: "bottom",
              defaultPageSize: 10,
              onChange: handlePageChange,
            }}
            size="large"
            dataSource={atlasContent.filter(
              (item) =>
                selectValue === "all" || selectValue.includes(item.systemType)
            )}
            loading={tableLoading}
            renderItem={(item) => (
              <List.Item style={{ display: handleDisplay(item) }} key={item.guid}>
                <Style.ListCard onClick={() => openHealthData(item)}>
                  <div
                    style={
                      gridChange === true
                        ? { width: "230px", height: "235px" }
                        : { width: "100%", height: "140px" }
                    }
                  >
                    <Style.ListTitleWrapper>
                      <Tooltip title={item.name}>
                        <Style.ListTitle>{item.name}</Style.ListTitle>
                      </Tooltip>
                      {item.systemType === SYSTEM_TYPE.props.WisDOM.key ||
                        item.systemType === SYSTEM_TYPE.props.WDC.key ? (
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {!gridChange ? (
                              <div>reference count: {item.referenceCount}</div>
                            ) : (
                              <Tooltip
                                title={`reference count: ${item.referenceCount}`}
                                >
                                <Badge
                                  count={item.referenceCount}
                 
                                  showZero
                                  />
                              </Tooltip>
                              )}
                            <Button
                              disabled={!item.deleteFlag}
                              type="text"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={(e) => handleDeleteTable(e, item)}
                              style={{
                                backgroundColor: "#ececec",
                                marginLeft: "10px",
                                lineHeight: "14px",
                              }}
                            />
                          </div>
                        ) : null}
                    </Style.ListTitleWrapper>
                    <Style.ListText>
                      {item.comment === "null" ? "" : item.comment}
                    </Style.ListText>
                    <Style.Hr />
                    <div>
                      <Tag color={SYSTEM_TYPE.props[item.systemType].color}>
                        {SYSTEM_TYPE.props[item.systemType].name}
                      </Tag>
                      {(item.tags && item.tags.length ? item.tags : []).map(
                        (tag) => (
                          <Tag className="listTag">{tag}</Tag>
                        )
                      )}
                      {(item.categories && item.categories.length
                        ? item.categories
                        : []
                      ).map((cat) => (
                        <Tag className="listCategory">{cat}</Tag>
                      ))}
                      <div
                        style={
                          gridChange === true
                            ? {
                              position: "absolute",
                              bottom: "0px",
                              right: "0px",
                              display: "flex",
                              alignItems: "center",
                            }
                            : { float: "right" }
                        }
                      >
                        {item.systemType === SYSTEM_TYPE.props.WisDOM.key ||
                          item.systemType === SYSTEM_TYPE.props.WDC.key ? (
   
                            <Button
                              style={{ margin: "10px" }}
                              title="Reference Chart"
                              onClick={(e) => openChart(item, e)}
                            >
                              <PartitionOutlined />
                              {gridChange === false && "Reference Chart"}
                            </Button>
                          ) : null}
              
                        {ListButton(item)}
                        <Button
                          style={{ margin: "10px" }}
                          title="Add"
                          disabled={
                            item.systemType !== SYSTEM_TYPE.props.WisDOM.key ||
                            item.preview !== PREVIEW_STATUS.ALLOWED.value
                          }
                          onClick={(e) => handleAddBtn(item, e)}
                        >
                          <PlusOutlined />
                          {gridChange === false && "Add"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Style.ListCard>
              </List.Item>
            )}
          />
        </div>

        <Style.FixIcon>
          {selectedColumns.length > 0 ? (
            <div>
              <Style.BadgeCircle>{selectedColumns.length}</Style.BadgeCircle>
              <Avatar
                onClick={handleCart}
                className="fixShadow fixIcon2"
                size={50}
                icon={<FileDoneOutlined />}
              />
            </div>
          ) : (
            <Avatar
              onClick={handleCart}
              className="fixShadow fixIcon2"
              size={50}
              icon={<FileDoneOutlined />}
              />
            )}
        </Style.FixIcon>
        <PreviewModal modal={previewModal} groupId={selectedGroup} />
        <ApplyModal
          modal={applyModal}
          user={user}
          onFinish={(table) =>
            handleUpdateName(table, table.name, PREVIEW_STATUS.APPLYING.value)}
          selectedGroup={selectedGroup}
          refresh={() => handleSearch(searchText, selectedGroup)}
        />
        {/* 此為search後的table按add加入購物車的畫面 */}
        <CartList
          cartlist={selectedColumns}
          visible={cartVisible}
          onClose={handleClose}
          Delete={toggleSelectedRow}
          handleSubmit={handleNext}
          loading={saveLoading}
          handleDataflowNext={handleDataflowNext}
        />
        <HealthDataModal
          modal={healthDataModal}
          disEdit={PREVIEW_STATUS.NOT_ALLOWED.value}
        />
        <ReferenceChartModal modal={referenceChartModal} />
        <Modal
          title="Confirm Deletion"
          visible={deleteConfirmModal.visible}
          onOk={handleDelete}
          onCancel={deleteConfirmModal.closeModal}
          maskClosable={!saveLoading}
          confirmLoading={saveLoading}
          closable={!saveLoading}
          cancelButtonProps={{ disabled: saveLoading }}
        >
          <p>Change group will clear all of the selected tables.</p>
          <p>Are you sure you want to continue?</p>
        </Modal>
        <DeleteTableModal
          modal={deleteTableConfirmModal}
          refresh={() => handleSearch(searchText, selectedGroup)}
        />
      </Style.ContainerBlock>
    </>
  );
};

SearchData.propTypes = {
  selectedColumns: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedColumns: PropTypes.func,
  next: PropTypes.func,
  selectedGroup: PropTypes.number,
  setSelectedGroup: PropTypes.func,
  setSelectedGroupObject: PropTypes.func,
};

SearchData.defaultProps = {
  selectedColumns: [],
  setSelectedColumns: () => null,
  next: () => null,
  selectedGroup: undefined,
  setSelectedGroup: () => null,
  setSelectedGroupObject: () => null,
};

export default SearchData;
