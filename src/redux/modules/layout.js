const TOGGLE = 'layout/TOGGLE';

const initialState = {
  visible: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      const {visible} = state;
      return {
        visible: !visible
      };
    default:
      return state;
  }
}

export function toggle() {
  return {
    type: TOGGLE
  };
}
