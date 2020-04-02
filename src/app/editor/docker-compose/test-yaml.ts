export const validYAML = `version: 3.1
services:
  redis:
    foo: bar
    boo:
      - bazz
      - john: doe
      -
        john: lenon
        lol: kek
      - muchas:
          gracias:
            - a
            - m
            - i
            - g
            - o`;

export const invalidYaml =
[
`dsdsds`,

`- version
foo`,

`boo:
- version
foo`
]