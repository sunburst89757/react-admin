import { Plugin, ResolvedConfig } from "vite";
import path from "path";
import { NodeSSH } from "node-ssh";

export const serverPlugin = ({
  host,
  serverPath,
  username,
  password
}: {
  host: string;
  serverPath: string;
  username: string;
  password: string;
}): Plugin => {
  let viteConfig: ResolvedConfig | null = null;
  return {
    name: "将本地打包文件推送到服务器上的指定路径",
    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async closeBundle() {
      const ssh = new NodeSSH();
      console.log("路径", path.resolve(__dirname, "./key/id_rsa"));

      await ssh.connect({
        host,
        username,
        password
      });
      const buildPath = path.resolve(viteConfig?.build.outDir || "dist");
      await ssh.execCommand(`rm -rf ${serverPath}/*`);
      try {
        await ssh.putDirectory(buildPath, serverPath, {
          concurrency: 10,
          recursive: true
        });
      } catch (error) {
        console.log(error, "上传错误");
      }
      // 关闭服务器连接
      ssh.dispose();
    }
  };
};
