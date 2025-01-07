export function useTokenDialog() {
  const showNoTokensDialog = () => {
    ElMessageBox({
      title: "you are out of tokens",
      message: h("p", null, [
        h("span", null, "you need to "),
        h("i", { style: "color: teal" }, "buy tokens"),
        h("span", null, " ,or try after midnight to get more tokens."),
      ]),
      confirmButtonText: "buy tokens",
      cancelButtonText: "cancel",
      type: "warning",
    }).then(() => {
      navigateTo("/plans");
    });
  };

  return {
    showNoTokensDialog,
  };
}
