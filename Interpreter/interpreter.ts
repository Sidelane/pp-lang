import { Token, Type } from '../Types/token.ts';


class Interpreter {
    private m_tokens: Token[];
    private m_index = 0;
    constructor(tokens: Token[]) {
        this.m_tokens = tokens;
    }
    public run() {
        while (this.m_index < this.m_tokens.length) {
            if (this.m_tokens[this.m_index].type == Type.Keyword) {
                if (this.m_tokens[this.m_index].contents == "dbg") {
                    this.m_index += 2;
                    if (this.m_tokens[this.m_index].type == Type.DoubleQuotedString || this.m_tokens[this.m_index].type == Type.SingleQuotedString) {
                        console.log(this.m_tokens[this.m_index].contents);
                    }
                    this.m_index++;
                }
            }
            this.m_index++;
        }
    }
    private peek(offset = 0): Token | null {
        if (this.m_index + offset >= this.m_tokens.length) return null;
        return this.m_tokens[this.m_index + offset];
    }
}

export { Interpreter };