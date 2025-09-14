import { createPortal } from "react-dom";
import Button from "../button/Button";
import { useLanguage } from "../../hooks/useLanguage";

export default function ExitModal({ onConfirm, onCancel }) {
  const { t } = useLanguage();
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-800/70 to-yellow-500/40 backdrop-blur-lg p-6 rounded-3xl shadow-2xl w-80 max-w-[90%] text-center border border-white/20">
        <p className="text-white text-lg font-semibold mb-4">{t.question}</p>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            onClick={onCancel}
            className="px-5 py-2 w-50 rounded-xl border border-white/30 text-white uppercase font-bold hover:bg-white/10 transition"
          >
            {t.cancel}
          </Button>
          <Button
            onClick={onConfirm}
            className="px-5 py-2 w-50 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-300 uppercase font-bold text-white-900 font-bold shadow-lg hover:scale-105 transition transform"
          >
            {t.exit}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
