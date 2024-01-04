import React from 'react';

const CardLabel = ({ children }: { children: React.ReactNode }) => {
    return <p className="text-xs font-semibold uppercase text-muted">{children}</p>;
};

export default CardLabel;
