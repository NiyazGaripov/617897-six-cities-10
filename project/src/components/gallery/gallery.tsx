type Props = {
  images: string[];
};

export function Gallery({images}: Props): JSX.Element {
  return (
    <div className="property__gallery">
      {
        images?.map((image) =>
          (
            <div className="property__image-wrapper" key={image}>
              <img className="property__image" src={image} alt="" />
            </div>
          )
        )
      }
    </div>
  );
}
