import { useEffect } from 'react';

const useDocumentTitle = (title: any) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
