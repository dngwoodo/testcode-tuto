function findCareer({ careers, id }) {
  return careers.find((career) => career.id === id);
}

function changeField({ state, name, value }) {
  return {
    ...state,
    [name]: value,
  };
}

function createNewCareers({ careers, changedCareer }) {
  return careers.map((career) =>
    career.id === changedCareer.id ? changedCareer : career
  );
}

function changeCareerField(state, { id, name, value }) {
  return {
    ...state,
    careers: createNewCareers({
      careers: state.careers,
      changedCareer: changeField({
        state: findCareer({ careers: state.careers, id }),
        name,
        value,
      }),
    }),
  };
}

describe('changeCareerField', () => {
  const initialState = {
    loading: {},
    errors: {},
    careers: [
      { id: 0, jobDetail: '' },
      { id: 1, jobDetail: '' },
      { id: 2, jobDetail: '' },
    ],
  };

  it('finds career having selected id', () => {
    expect(findCareer({ careers: initialState.careers, id: 0 })).toEqual(
      initialState.careers[0]
    );
  });

  it('changes career value', () => {
    expect(
      changeField({
        state: initialState.careers[0],
        name: 'jobDetail',
        value: '프론트',
      })
    ).toEqual({
      id: 0,
      jobDetail: '프론트',
    });
  });

  it('creates new careers', () => {
    expect(
      createNewCareers({
        careers: initialState.careers,
        changedCareer: { id: 2, jobDetail: '프론트' },
      })
    ).toEqual([
      { id: 0, jobDetail: '' },
      { id: 1, jobDetail: '' },
      { id: 2, jobDetail: '프론트' },
    ]);
  });

  it('returns new initialState', () => {
    expect(
      changeCareerField(initialState, {
        id: 0,
        name: 'jobDetail',
        value: '프론트',
      })
    ).toEqual({
      loading: {},
      errors: {},
      careers: [
        { id: 0, jobDetail: '프론트' },
        { id: 1, jobDetail: '' },
        { id: 2, jobDetail: '' },
      ],
    });
  });
});

// 내가 테스트하고 싶은 것
// career의 값을 변경하는 것

// 1. career값을 찾는다.

// 2. career값을 변경한다.

// 3. career값을 변경한 새로운 초기값을 반환한다.
