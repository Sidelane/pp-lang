# PP Programming Language written in Typescript

### Todo
- Multiple Types of Tokens:
    - Simple Token: No Contents/Expressions
    - Content Token: Token with added Content, example: string
    - Expression Token: Token with added Expression, example: Keyword dbg
        - Type: Keyword
        - Content: "dbg"
        - Expression: 1+1 | "String"
    - Block Token: Token with added Tokens, example: if (Make these expandable somehow: else if etc.)
        - Type: Keyword
        - Content: "if"
        - Expression: 3 > 2
        - Block: List of Tokens what to do if Expression is true