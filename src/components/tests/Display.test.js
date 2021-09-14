import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from './../Display'
import userEvent from '@testing-library/user-event';
import fetchShow from '../../api/fetchShow';

jest.mock('../../api/fetchShow')

const mockFetch = (testShow) => {
  return (
      fetchShow.mockResolvedValueOnce(testShow)
  )
}

const testShow = {
  name:'Show name',
  summary:'Show summary',
  seasons:[
      {id:0, name: "Season 1", episodes: []},
      {id:1, name: "Season 2", episodes: []}
  ]
}

test("renders without error", () => {
  render(<Display />);
});

test("Test that when the fetch button is pressed, the show component will display", async () => {
  mockFetch(testShow);
  render(<Display />);
  userEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(screen.getByTestId('show-container')).toBeInTheDocument();
  })
});

test("On button press, rendered options is same as amount of seasons", async () => {
  mockFetch(testShow);
  render(<Display />);
  userEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(screen.getAllByTestId('season-option')).toHaveLength(2)
  })
})

test("when button is pushed, displayFunc is called", async () => {
  const mockDisplayFunc = jest.fn()
  mockFetch(testShow);
  render(<Display displayFunc={mockDisplayFunc}/>);
  userEvent.click(screen.getByRole('button'))
  await waitFor(() => {
    expect(mockDisplayFunc).toBeCalled();
  })
});










///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.