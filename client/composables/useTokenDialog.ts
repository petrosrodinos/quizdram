export function useTokenDialog() {
  const showNoTokensDialog = () => {
    ElMessageBox({
      title: "you are out of tokens",
      message: h("p", null, [
        h("span", null, "you need to "),
        h("i", { style: "color: teal" }, "buy tokens"),
        h("span", null, " to create more quizzes."),
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
