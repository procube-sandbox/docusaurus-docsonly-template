const assert = require("assert");
const YAML = require("yaml");

function processMultipleLines(text) {
  if (text) {
    const lines = text.split(/\n/);
    if (lines[0].startsWith("<")) return text;
    return lines.map((x) => x + (x.startsWith("<") ? "\n" : "<br/>")).join("");
  }
  return "";
}

function processTest(test, options) {
  const test_list = test.map((item) => {
    const procedure = item.procedure
      ? `<b>テスト手順:</b><br/>${processMultipleLines(item.procedure)}`
      : "";
    const expects = item.expects
      ? `<b>期待される結果:</b><br/>${processMultipleLines(item.expects)}`
      : "";
    const comments = item.comments
      ? `<b>備考:</b><br/>${processMultipleLines(item.comments)}`
      : "";
    return `<tr><td>${item.id || ""}</td><td>XXX${processMultipleLines(
      item.spec
    )}</td><td>${statusClass(item.status)}</td><td>${
      procedure + expects + comments
    }</td></tr>\n`;
  });
  return {
    type: "jsx",
    value: `<table class="test-spec"><thead><tr><td>ID</td><td>要件</td><td>状態</td><td>テスト手順など</td></tr></thead>\n<tbody>\n${test_list.join(
      "\n"
    )}</tbody></table>`,
  };
}

const statusClassMap = {
  仕様待ち: "waiting",
  未実装: "need-implement",
  未テスト: "need-test",
  テスト不要: "no-test",
  実装不要: "no-implement",
  OK: "ok",
  NG: "ng",
};
function statusClass(status) {
  const statusClassValue = statusClassMap[status];
  if (!statusClassValue) {
    throw new Error(`test status ${status} is not valid.`);
  }
  return `<div class="${statusClassValue}">${status}</div>`;
}

const plugin = (options) => {
  const transformer = async (ast, vfile) => {
    assert(ast.type == "root");
    assert(Array.isArray(ast.children));
    ast.children = ast.children.map((node) => {
      if (
        node.type == "code" &&
        node.lang == "yaml" &&
        node.meta &&
        node.meta.includes("format_as_test_table")
      ) {
        try {
          return processTest(YAML.parse(node.value), node.meta);
        } catch (e) {
          throw new Error(
            `error occur in yaml test specification file:${vfile.path} line:${node.position.start.line} error:${e}`
          );
        }
      }
      return node;
    });
  };
  return transformer;
};

module.exports = plugin;
