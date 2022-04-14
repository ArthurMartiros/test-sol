import { BadRequestError, Body, JsonController, Param, Params, Post, QueryParam, Req, UploadedFile } from "routing-controllers";
import { Service } from "typedi";
import * as parser from "@solidity-parser/parser";

@JsonController("/")
@Service()
export class AnalyzeController {
    @Post("analyze")
    public async setDetailsAction(
        @UploadedFile("code") file: any,
        @Req() req: any
    ) {
        try {
            if (!file) {
                throw new BadRequestError("code parameter mast be filled with file!");
            }
            const fn = file.originalname.split(".");
            const extension = fn[fn.length -1];
            if (extension !== "sol") {
                throw new BadRequestError("The specified file must be in extesion of .sol!");
            }
            const ast = parser.parse(file.buffer.toString(), {
                tolerant: true
            });
            const contracts = ast.children.filter(ch => ch.type === "ContractDefinition").map(ch => (ch as any).name);
            const importDirectives = ast.children.filter(ch => ch.type === "ImportDirective").map(ch => (ch as any).path)
            return {
                imports: importDirectives,
                contracts
            };
        } catch (e) {
            console.error(e);
            let err: any = "Something Went Wrong :( !";
            if (e instanceof parser.ParserError) {
                err = e.errors
            }
            if (e instanceof BadRequestError) {
                throw e;
            }
            throw new BadRequestError(err);
        }
    }

}