// @ts-ignore
import React, {ReactElement} from "react";
import {useTranslation} from "react-i18next";

// @ts-ignore
import {gapi} from "gapi-script";

const List = (): ReactElement => {
  const {t} = useTranslation();

  return (
    <div className={'file-list'}>
      {t('File list')}

    </div>
  );
}
export default List;
