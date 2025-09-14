import { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../button/Button";

export default function InfoModal({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const { t } = useLanguage();

  const steps = t.steps;

  const nextStep = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const { title, description } = steps[stepIndex];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gradient-to-br from-yellow-300/40 to-yellow-200/30 backdrop-blur-lg p-6 rounded-xl shadow-2xl w-96 max-w-[90%] text-center border border-purple-600/50">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">{title}</h2>
        <p className="text-yellow-400 mb-6 text-left">{description}</p>

        <div className="flex justify-between items-center">
          <Button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="px-4 py-2 bg-purple-800/70 text-yellow-300 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {t.stepsButtons.back}
          </Button>
          {stepIndex === steps.length - 1 ? (
            <Button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-purple-900 to-purple-500 text-white rounded-lg hover:scale-105 transition"
            >
              {t.stepsButtons.close}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="px-4 py-2 bg-gradient-to-r from-purple-900 to-purple-500 text-white rounded-lg hover:scale-105 transition"
            >
              {t.stepsButtons.next}
            </Button>
          )}
        </div>

        <div className="mt-4 text-sm text-yellow-300">
        {stepIndex + 1} / {steps.length}
        </div>
      </div>
    </div>,
    document.body
  );
}
