import { useQuasar } from "quasar";

export default function useDialog() {
  const $q = useQuasar();

  /** Usando destructor na função dialogShow para controlar
   * os valores de título e mensagem que serão exibidos.
   */

  function dialogShow({ tittle: tittle, message: message }) {
    return $q.dialog({
      title: tittle || "Confirmação",
      message: message || "Dialig Message",
      cancel: true,
      persistent: true,
    });
  }

  /** dialogPromptShow funciona da mesma forma que o dialogPrompt, porém ele conta com
   * o prompt (recurso do quasar para edição em dialogs) de forma que fique separada a
   * lógica e uso dos componentes.
   */

  function dialogPromptShow({ tittle: tittle, message: message, prompt: prompt }) {
    return $q.dialog({
      title: tittle || "Confirmação",
      message: message || "Dialig Message",
      prompt: {
        model: prompt,
        type: "text",
      },
      cancel: true,
      persistent: true,
    });
  }

  return {
    dialogShow,
    dialogPromptShow
  };
}
