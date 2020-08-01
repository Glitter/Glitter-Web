import React from 'react';

interface StepPropsInterface {
  children?: any;
  title: string;
  image: string;
  isArt?: boolean;
}

const Step: React.FC<StepPropsInterface> = ({
  children,
  title,
  image,
  isArt = false,
}) => {
  return (
    <article className="grid gap-6 lg:gap-12 xl:gap-24">
      <img
        className={`${
          isArt ? 'w-96 lg:w-7/12' : 'w-full border-secondary-800 border'
        }`}
        src={image}
        alt={title}
      />
      <div>
        <header>
          <h4 className="font-medium text-xl leading-tight lg:text-2xl xl:text-4xl xl:font-semibold">
            {title}
          </h4>
        </header>
        {children && (
          <div className="mt-2 text-base lg:text-lg xl:text-2xl">
            {children}
          </div>
        )}
      </div>
    </article>
  );
};

Step.displayName = 'Step';

export default Step;
