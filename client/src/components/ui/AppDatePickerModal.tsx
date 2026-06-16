import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  isVisible: boolean;
  value: Date;
  minimumDate?: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
};

export function AppDatePickerModal({
  isVisible,
  value,
  minimumDate,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      date={value}
      minimumDate={minimumDate}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}