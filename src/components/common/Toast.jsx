import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export default function Toast() {
  const { toastMessage } = usePrivacy();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isWarning = toastMessage.type === 'warning';

  return (
    <div className="fixed bottom-20 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className={`flex items-start gap-3 p-3.5 rounded-lg border shadow-xl bg-[#0c1427]/95 backdrop-blur-md ${
        isSuccess
          ? 'border-emerald-500/30 text-emerald-200'
          : isWarning
          ? 'border-amber-500/30 text-amber-200'
          : 'border-sky-500/30 text-sky-200'
      }`}>
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
          {!isSuccess && !isWarning && <Info className="w-4 h-4 text-sky-400" />}
        </div>
        <div className="text-xs font-medium leading-relaxed">
          {toastMessage.message}
        </div>
      </div>
    </div>
  );
}
