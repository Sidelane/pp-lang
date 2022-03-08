enum Type {
    Invalid = "Invalid",
    LeftParen = "(",
    RightParen = ")",
    LeftCurly = "{",
    RightCurly = "}",
    LeftBracket = "[",
    RightBracket = "]",
    Comma = ",",
    Dot = ".",
    Semicolon = ";",
    Comment = "//",
    DoubleQuotedString = "\"",
    SingleQuotedString = "'",
    Keyword = "keyword",
    NewLine = "\n",
    Space = " ",
    Tab = "\t",
    LessThan = "<",
    GreaterThan = ">",
    Equal = "=",
    LessThanEqual = "<=",
    GreaterThanEqual = ">=",
    Not = "!",
    NotEqual = "!=",
    Plus = "+",
    PlusPlus = "++",
    Number = "number"
}

interface IToken {
    readonly type: Type;
    readonly contents?: string;
    readonly expression?: string;
    to_string(): string;
}

class Token implements IToken {
    public type: Type;
    public contents: string;
    public expression: string;
    constructor(type: Type, contents = "", expression = "") {
        this.type = type;
        this.contents = contents;
        this.expression = expression;
    }  
    public to_string(): string {
        switch (this.type) {
            case Type.Invalid:
                return "Invalid";
            case Type.LeftParen:
                return "LeftParen";
            case Type.RightParen:
                return "RightParen";
            case Type.LeftCurly:
                return "LeftCurly";
            case Type.RightCurly:
                return "RightCurly";
            case Type.LeftBracket:
                return "LeftBracket";
            case Type.RightBracket:
                return "RightBracket";
            case Type.Semicolon:
                return "Semicolon";
            case Type.Comment:
                return "Comment";
            case Type.DoubleQuotedString:
                return "DoubleQuotedString";
            case Type.SingleQuotedString:
                return "SingleQuotedString";
            case Type.Keyword:
                return "Keyword";
            case Type.NewLine:
                return "NewLine";
            case Type.Space:
                return "Space";
            case Type.Tab:
                return "Tab";
            case Type.LessThan:
                return "LessThan";
            case Type.GreaterThan:
                return "GreaterThan";
            case Type.Equal:
                return "Equal";
            case Type.LessThanEqual:
                return "LessThanEqual";
            case Type.GreaterThanEqual:
                return "GreaterThanEqual";
            case Type.Not:
                return "Not";
            case Type.NotEqual:
                return "NotEqual";
            case Type.Plus:
                return "Plus";
            case Type.PlusPlus:
                return "PlusPlus";
            case Type.Number:
                return "Number";
            default:
                return "Invalid Token";
        }
    }
}

const keywords = [
    "dbg",
    "let",
    "if"
]

export { Type, Token, keywords };