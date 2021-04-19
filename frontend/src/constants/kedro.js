export const NODE = {
  DATASET: {
    key: 'DATASET',
  },
  TRANSFORM: {
    key: 'TRANSFORM',
    transform: {
      SELECTFIELDS: {
        name: 'selectfields',
        nodeParent: [],
      },
      CUSTOMIZE: {
        name: 'customize',
        nodeParent: [],
      },
    },
  },
  TARGET: {
    key: 'TARGET',
    publish: false,
  },
};

export const TEMPNODE = {
  DATASET: {
    full_name: '',
    name: '',
    id: '',
    type: '',
    args: [],
  },
  TRANSFORM: {
    full_name: '',
    name: '',
    id: '',
    type: '',
    args: [],
  },
};
