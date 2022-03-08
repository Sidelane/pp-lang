import { Token, Type } from '../Types/token.ts';

class Lexer {
    private static m_nums: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    private m_input = "";
    private m_tokens: Token[] = [];
    private m_index = 0;
    constructor(input: string) {
        this.m_input = input;
    }
    public get_tokens() {
        return this.m_tokens;
    }
    private emit_token(type: Type, content = "", expression = "") {
        const tk = new Token(type, content, expression);
        this.m_tokens.push(tk);
    }
    public lex() {
        while (this.m_index < this.m_input.length) {
            const ch = this.peek();

            if (ch === Type.SingleQuotedString) {
                const contents = this.consume_until(Type.SingleQuotedString, 1, true);
                this.emit_token(Type.SingleQuotedString, contents);
                continue;
            }

            if (ch === Type.DoubleQuotedString) {
                const contents = this.consume_until(Type.DoubleQuotedString, 1, true);
                this.emit_token(Type.DoubleQuotedString, contents);
                continue;
            }

            if (ch === " " || ch === "\t") {
                //this.emit_token(Type.Space);
                this.consume();
                continue;
            }
            if (ch === "/" && this.peek(1) === "/") {
                const content = this.consume_until("\n", 2);
                this.emit_token(Type.Comment, content);
                continue;
            }
            if (Lexer.m_nums.includes(ch)) {
                if (Lexer.m_nums.includes(this.peek(1))) {
                    const content = this.consume_number();
                    this.emit_token(Type.Number, content);
                    continue;
                } else {
                    const content = this.peek();
                    this.emit_token(Type.Number, content);
                    this.consume();
                    continue;
                }
            }
            if (ch === Type.LeftParen) {
                this.emit_token(Type.LeftParen);
                this.consume();
                continue;
            }
            if (ch == Type.RightParen) {
                this.emit_token(Type.RightParen);
                this.consume();
                continue;
            }
            if (ch === Type.LeftCurly) {
                this.emit_token(Type.LeftCurly);
                this.consume();
                continue;
            }
            if (ch === Type.RightCurly) {
                this.emit_token(Type.RightCurly);
                this.consume();
                continue;
            }
            if (ch === Type.LeftBracket) {
                this.emit_token(Type.LeftBracket);
                this.consume();
                continue;
            }
            if (ch === Type.RightBracket) {
                this.emit_token(Type.RightBracket);
                this.consume();
                continue;
            }
            if (ch === Type.Comma) {
                this.emit_token(Type.Comma);
                this.consume();
                continue;
            }
            if (ch === Type.Dot) {
                this.emit_token(Type.Dot);
                this.consume();
                continue;
            }
            if (ch === Type.Semicolon) {
                this.emit_token(Type.Semicolon);
                this.consume();
                continue;
            }
            if (ch === Type.LessThan) {
                if (this.peek(1) === Type.Equal) {
                    this.emit_token(Type.LessThanEqual);
                    this.consume(2);
                    continue;
                } else {
                    this.emit_token(Type.LessThan);
                    this.consume();
                    continue;
                }
            }
            if (ch === Type.GreaterThan) {
                if (this.peek(1) === Type.Equal) {
                    this.emit_token(Type.GreaterThanEqual);
                    this.consume(2);
                    continue;
                } else {
                    this.emit_token(Type.GreaterThan);
                    this.consume();
                    continue;
                }
            }
            if (ch === Type.Equal && this.peek(1) === Type.Equal) {
                this.emit_token(Type.Equal);
                this.consume(2);
                continue;
            }
            if (ch === Type.Not && this.peek(1) === Type.Equal) {
                this.emit_token(Type.NotEqual);
                this.consume(2);
                continue;
            }
            if (ch === Type.Equal) {
                this.emit_token(Type.Equal);
                this.consume();
                continue;
            }
            if (ch === Type.Plus) {
                if (this.peek(1) === Type.Plus) {
                    this.emit_token(Type.PlusPlus, "++");
                    this.consume(2);
                    continue;
                } else {
                    this.emit_token(Type.Plus, "+");
                    this.consume();
                    continue;
                }
            }

            // Check for Keywords
            if (ch === "d" && this.peek(1) === "b" && this.peek(2) === "g") {

                // Consume dbg(
                this.consume(4);

                // get the expression up to the RightParen, and then consume the Semicolon 
                let contents = this.consume_until(Type.RightParen, 0, true);

                // Append Token with Expression
                this.emit_token(Type.Keyword, "dbg", contents);

                continue;
            }

            if (ch === "i" && this.peek(1) === "f") {
                this.emit_token(Type.Keyword, "if");
                this.consume(2);
                continue;
            }

            if (ch === "l" && this.peek(1) === "e" && this.peek(2) === "t") {
                this.emit_token(Type.Keyword, "let");
                this.consume(3);
                continue;
            }

            this.consume();

        }
    }
    private consume(index = 0) {
        if (index === 0) this.m_index++;
        this.m_index += index;
    }
    private consume_number(): string {
        let num = "";
        this.consume();
        while (Lexer.m_nums.includes(this.peek())) {
            num += this.peek();
            this.consume();
        }
        return num;
    }
    private consume_until(end: string, offset = 0, consume_after = false): string {
        if (offset > 0) this.consume(offset);
        let content = "";
        while (this.peek() !== end) {
            content += this.peek();
            this.consume();
        }
        if (consume_after) this.consume();
        return content;
    }
    private peek(offset = 0): string {
        if ((this.m_index + offset) >= this.m_input.length) return "";
        return this.m_input[this.m_index + offset];
    }
}

export { Lexer };