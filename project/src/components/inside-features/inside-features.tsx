type Props = {
  features: string[];
};

function InsideFeatures(props: Props): JSX.Element {
  const features = props.features.map((feature: string): JSX.Element =>
    (
      <li className="property__inside-item" key={feature}>
        {feature}
      </li>
    )
  );

  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {features}
      </ul>
    </div>
  );
}

export default InsideFeatures;
