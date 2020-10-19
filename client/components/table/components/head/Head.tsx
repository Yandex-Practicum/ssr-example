import React, {FC} from 'react';

const Head: FC = ({children}) => {
    return (
        <thead>
            {children}
        </thead>
    );
};
export default Head;
