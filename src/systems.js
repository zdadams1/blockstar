const MoveFinger = (entities, { touches }) => {
  touches
    .filter(touches => touches.type === 'move')
    .forEach(touches => {
      let finger = entities[touches.id];
      if (finger && finger.position) {
        finger.position = [
          finger.position[0] + touches.delta.pageX,
          finger.position[1] + touches.delta.pageY
        ];
      }
    });

  return entities;
};

export { MoveFinger };
