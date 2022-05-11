const program = require("commander");
const fs = require("fs");
// const marked = require("marked");
const md2html = require("./md2html");

program.option("--gfm", "Enable GFM");

program.parse(process.argv);

const options = program.opts();

const cilOptions = {
  gfm: options.gfm ?? false
}

const filePath = program.args[0];

fs.readFile(filePath, {encoding: "utf8"}, (err, file) => {
  if(err) {
    // エラーでなければerrはnullかundefined
    console.error(err.message);
    process.exit(1);
    return;
  }
  const html = md2html(file, cilOptions);
  console.log(html);
});

