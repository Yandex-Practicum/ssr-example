import React from 'react';

export const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
};
