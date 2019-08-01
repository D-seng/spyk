var arrX = [
  {
    id: 'f-23',
    verbiage: 'abcdefchijklmnopqrstuvwxyz',
    section: 0,
    subsections: [
      {
        id: 'f-24',
        verbiage: 'subsection to yet more canned words',
        section: '0.1',
        subsections: [
          {
            id: 'f-34',
            verbiage: 'subsection to yet more canned words',
            section: '0.1.1',
            subsections: [
              {
                id: 'f-341',
                verbiage: 'subsection to yet more canned words',
                section: '0.1.1.1',
                subsections: []
              },
              {
                id: 'f-342',
                verbiage: 'subsection to yet more canned words',
                section: '0.1.1.2',
                subsections: [
                  {
                    id: 'f-3421',
                    verbiage: 'subsection to yet more canned words',
                    section: '0.1.1.2.1',
                    subsections: [
                      {
                        id: 'f-34211',
                        verbiage: 'subsection to yet more canned words',
                        section: '0.1.1.2.1.1',
                        subsections: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 'f-44',
                verbiage: 'subsection to yet more canned words',
                section: '0.1.1.3',
                subsections: [
                  {
                    id: 'f-34',
                    verbiage: 'subsection to yet more canned words',
                    section: '0.1.1.3.1',
                    subsections: []
                  },
                  {
                    id: 'f-444',
                    verbiage: 'subsection to yet more canned words',
                    section: '0.1.1.3.2',
                    subsections: [
                      {
                        id: 'f-54',
                        verbiage: 'subsection to yet more canned words',
                        section: '0.1.1.3.2.1',
                        subsections: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'f-34',
            verbiage: 'subsection to yet more canned words',
            section: '0.1.2',
            subsections: []
          }
        ]
      },
      {
        id: 'f-25',
        verbiage: 'another subsection to yet more canned words',
        section: '0.2',
        subsections: [
          {
            id: 'f-26',
            verbiage: 'Subsection canned verbiage',
            section: '0.2.1',
            subsections: []
          }
        ]
      }
    ]
  },
  {
    id: '4f88a420-5825-11e9-8565-ad52d0bb74d6',
    verbiage:
      'yabqba---update 332--555-update from ux--tttttttt------ttttttttttttt-----',
    section: 1,
    subsections: []
  },
  {
    id: '500acc70-5825-11e9-8565-ad52d0bb74d6',
    verbiage: 'dabba',
    section: 2,
    subsections: []
  },
  {
    id: '51b3e890-5825-11e9-8565-ad52d0bb74d6',
    verbiage: 'doo',
    section: 3,
    subsections: [
      {
        id: '5227e010-5825-11e9-8565-ad52d0bb74d6',
        verbiage: 'larry---subsection update 2',
        section: '3.1',
        subsections: []
      },
      {
        id: '52611880-5825-11e9-8565-ad52d0bb74d6',
        verbiage: 'moe',
        section: '3.2',
        subsections: [
          {
            id: '527c1a90-5825-11e9-8565-ad52d0bb74d6',
            verbiage: 'curly',
            section: '3.2.1',
            subsections: []
          }
        ]
      },
      {
        id: '52b30910-5825-11e9-8565-ad52d0bb74d6',
        verbiage: 'scooby',
        section: '3.3',
        subsections: [
          {
            id: '51b3e890-5825-11e9-8565-ad52d0bb74d6',
            verbiage: 'skipper',
            section: '3.3.1',
            subsections: [
              {
                id: '1265c8a0-5827-11e9-8565-ad52d0bb74d6',
                verbiage: 'gilligan',
                section: '3.3.1.1',
                subsections: []
              }
            ]
          }
        ]
      },
      {
        id: '52996690-5825-11e9-8565-ad52d0bb74d6',
        verbiage: 'grape ape',
        section: '3.4',
        subsections: []
      }
    ]
  }
]

var arrNew = []

function createFlat(arr) {
  arr.forEach(x => {
    if (x.subsections.length > 0) {
      createFlat(x.subsections)
    } else {
      arrNew.push(x)
    }
  })
}

createFlat(arrX)

console.log(arrNew)
