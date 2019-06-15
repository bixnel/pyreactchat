function SectionItem(props) {
  return <section>this is section, not {props.htmlTag}</section>
};

const SectionItemNew = (props) => (
  <section>this is section, not {props.htmlTag}</section>
)

ReactDOM.render(
  <div>
    <SectionItemNew htmlTag='div' />
    <SectionItemNew htmlTag='span' />
    <SectionItemNew htmlTag='br' />
  </div>,
  document.getElementById('app')
);
