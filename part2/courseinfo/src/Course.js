const Course = ({ name, parts }) => {
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((item) => {
        return <Part part={item} key={item.id} />;
      })}
    </>
  );
};

const Total = (props) => {
  return (
    <strong>
      total of{" "}
      {props.parts.reduce((sum, item) => {
        return (sum += item.exercises);
      }, 0)}{" "}
      exercises
    </strong>
  );
};


export default Course;
