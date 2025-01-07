export function useTokenDialog() {
  const showNoTokensDialog = () => {
    ElMessageBox({
      title: "you are out of tokens",
      message: h("p", null, [
        h("span", null, "you need to "),
        h("i", { style: "color: teal" }, "give a review"),
        h("span", null, " ,or try after midnight to get more tokens."),
      ]),
      confirmButtonText: "sent a review",
      cancelButtonText: "cancel",
      type: "warning",
    }).then(() => {
      navigateTo("/feedback");
    });
  };

  return {
    showNoTokensDialog,
  };
}
