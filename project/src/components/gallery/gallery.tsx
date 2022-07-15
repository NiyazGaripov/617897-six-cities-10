type Props = {
  images: string[];
};

export function Gallery(props: Props): JSX.Element {
  return (
    <div className="property__gallery">
      {
        props.images.map((image) =>
          (
            <div className="property__image-wrapper" key={image}>
              <img className="property__image" src={image} alt="Photo studio" />
            </div>
          )
        )
      }
    </div>
  );
}
