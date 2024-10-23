import {ExecException} from "child_process";
import {exec} from "child_process";
 
export async function transpile(path: string, outdir: string): Promise<void> {
    let path0: string = path;
    let path1: string = outdir;
    let command: string = `bun build ${path0} --outdir ${path1}`;
    let e: ExecException | null = await new Promise(resolve => exec(command, e => resolve(e)));
    if (e) throw e;
    return;
}