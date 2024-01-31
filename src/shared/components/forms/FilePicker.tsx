import { PrimaryButton } from '@fluentui/react';
import { useCallback, useRef } from 'react';
import { FilesUtil } from '../../utils/filesUtil';
import { read, utils } from 'xlsx-color';

interface Props {
  name: string;
  label: string;
  handleImportedFile: (pickedFile: any[]) => void;
}

const FilePicker = ({
  name,
  label,
  handleImportedFile,
}: Props): React.ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (!files || files.length === 0) {
        return;
      }

      try {
        const buffer = await FilesUtil.ReadFile(files[0]);
        const workbook = read(buffer, { type: 'buffer' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data: Worker[] = utils.sheet_to_json(worksheet);
        handleImportedFile(data);
        event.target.value = '';
      } catch (error) {
        console.error('Error reading file:', error);
      }
    },
    [handleImportedFile],
  );

  return (
    <div>
      <input
        style={{ display: 'none' }}
        type="file"
        id={name}
        accept=".xlsx, .xls"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <PrimaryButton
        className="actionButton primeAction"
        type="button"
        onClick={handleImportClick}
      >
        {label}
      </PrimaryButton>
    </div>
  );
};

export default FilePicker;
