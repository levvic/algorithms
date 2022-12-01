import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Check props circle', () => {
  it('Circle without props', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with letter', () => {
    const tree = renderer.create(<Circle letter={'test text'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with head', () => {
    const tree = renderer.create(<Circle head={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with React-element as head', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with tail', () => {
    const tree = renderer.create(<Circle tail={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with React-element as tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle with index', () => {
    const tree = renderer.create(<Circle index={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle isSmall', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle in default state', () => {
    const tree = renderer.create(<Circle state={`${ElementStates.Default}`} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle in changing state', () => {
    const tree = renderer.create(<Circle state={`${ElementStates.Changing}`} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle in modified state', () => {
    const tree = renderer.create(<Circle state={`${ElementStates.Modified}`} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});