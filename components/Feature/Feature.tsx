import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface FeaturePropsInterface {
  children: any;
  title: string;
  icon: IconProp;
}

const Step: React.FC<FeaturePropsInterface> = ({ children, title, icon }) => {
  return (
    <article className="grid gap-4 grid-flow-col">
      <FontAwesomeIcon
        icon={icon}
        size="2x"
        className="text-yellow-300"
        fixedWidth
      />
      <div>
        <header>
          <h4 className="mt-1 font-medium text-xl text-primary-200 leading-tight">
            {title}
          </h4>
        </header>
        <div className="mt-2 text-base text-primary-100">{children}</div>
      </div>
    </article>
  );
};

Step.displayName = 'Step';

export default Step;
