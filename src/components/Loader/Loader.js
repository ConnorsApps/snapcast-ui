// FROM https://cssloaders.github.io/
// Copyright (c) 2020 Vineeth.TR

import { useState } from 'react';
import './Loader.scss';

const Loader = ({ isLoading }) => {
    const [showLoading, setShowLoading] = useState(isLoading);

    if (showLoading) {
        return (
            <span
                className={`loader ${isLoading ? '' : 'loader-hidden'}`}
                onTransitionEnd={() => setShowLoading(false)}
            />
        );
    } else {
        return <></>;
    };
}

export default Loader;