type Props = {
  features: string[];
};

export function InsideFeatures(props: Props): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          props.features.map((feature) =>
            (
              <li className="property__inside-item" key={feature}>
                {feature}
              </li>
            )
          )
        }
      </ul>
    </div>
  );
}
