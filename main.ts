import { Lexer } from './Lexer/lexer.ts';
import { Interpreter } from './Interpreter/interpreter.ts';

let debug = false;

if (Deno.args.length == 0) {
    console.log("Usage: deno run main.ts <input_file>");
    Deno.exit();
}

if (Deno.args[1] == "--dbg") {
    debug = true;
}

const contents = await Deno.readTextFile(Deno.args[0]);
const lexer = new Lexer(contents);
lexer.lex();
const int = new Interpreter(lexer.get_tokens());

int.run();

if (debug) {
    lexer.get_tokens().forEach(element => {
        if (element.contents == "") {
            console.log("Token: " + element.to_string());
        } else {
            console.log("Token: " + element.to_string() + ", Content: " + element.contents)
        }
    });
}
