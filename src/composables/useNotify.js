import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || "Tudo certo ✅",
      timeout: 2000,
      actions: [
        {
          label: "Ok",
          color: "white",
        },
      ],
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || "Deu ruim 😢",
      timeout: 2000,
      actions: [
        {
          label: "Ok",
          color: "white",
        },
      ],
    });
  };

  const notifyWarning = (message) => {
    $q.notify({
      type: 'warning',
      message: message || "Atenção ⚠️",
      textColor: "white",
      timeout: 2000,
      actions: [
        {
          label: "Ok",
          color: "white",
        },
      ],
    });
  };

  const notifyOngoing = (onMessage, message, type) => {
    const notify = $q.notify({
      type: 'ongoing',
      textColor: 'white',
      message: onMessage || "Um momento... ⏱️",
    });

    setTimeout(() => {
      notify({
        type: type,
        message: message || 'Retorno do setTimeout',
        timeout: 2000,
        actions: [
          {
            label: "Ok",
            color: "white",
          },
        ],
      });

    }, 3000);
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyOngoing
  };
}
