import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';

export type PhoneStatus = 'empty' | 'invalid-prefix' | 'incomplete' | 'valid';

const ALERT_DURATION_MS = 3200;

export function getPhoneStatus(phone: string): PhoneStatus {
  if (phone.length === 0) return 'empty';
  // Indian mobile numbers start with 6, 7, 8 or 9
  if (!/^[6-9]/.test(phone)) return 'invalid-prefix';
  return phone.length === 10 ? 'valid' : 'incomplete';
}

/**
 * State for the strict 10-digit Indian mobile number field. Anything that isn't a digit
 * is blocked or stripped, and a short-lived alert explains what happened.
 */
export function usePhoneField() {
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const alertTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showAlert = useCallback((message: string) => {
    setAlert(message);
    clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlert(null), ALERT_DURATION_MS);
  }, []);

  const hideAlert = useCallback(() => {
    clearTimeout(alertTimer.current);
    setAlert(null);
  }, []);

  useEffect(() => () => clearTimeout(alertTimer.current), []);

  const setValue = (raw: string, strippedMessage: string) => {
    if (/[^0-9]/.test(raw)) showAlert(strippedMessage);

    const digits = raw.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(digits);

    const status = getPhoneStatus(digits);
    if (status === 'invalid-prefix') showAlert('⚠️ Indian mobile numbers must start with 6, 7, 8, or 9.');
    else if (status === 'valid') hideAlert();
  };

  const inputProps = {
    ref: inputRef,
    value: phone,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value, '⚠️ Numbers only! Letters and special characters have been cleared.'),
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      // Block printable non-digits before they reach the field; leave shortcuts and control keys alone
      if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        showAlert('⚠️ Numbers only! Letters and special symbols are blocked.');
      }
    },
    onPaste: (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      setValue(e.clipboardData.getData('text'), '⚠️ Non-numeric characters were removed from your pasted phone number.');
    },
  };

  return {
    phone,
    status: getPhoneStatus(phone),
    alert,
    showAlert,
    focus: () => inputRef.current?.focus(),
    reset: () => setPhone(''),
    inputProps,
  };
}
