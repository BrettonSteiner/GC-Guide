import React, {Fragment} from 'react';
import "./DataTable.css";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  // useRowSelect,
} from 'react-table';
// import matchSorter from 'match-sorter'

// import makeData from './makeData'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }

//     td {
//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

// Create an editable cell renderer
// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
//   editable,
// }) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue)

//   const onChange = e => {
//     setValue(e.target.value)
//   }

//   // We'll only update the external data when the input is blurred
//   const onBlur = () => {
//     updateMyData(index, id, value)
//   }

//   // If the initialValue is changed externall, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])

//   if (!editable) {
//     return `${initialValue}`
//   }

//   return <input value={value} onChange={onChange} onBlur={onBlur} />
// }

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  // const count = preFilteredRows.length

  return (
    <input
      className="form-control"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      // placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
// function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the options for filtering
//   // using the preFilteredRows
//   const options = React.useMemo(() => {
//     const options = new Set()
//     preFilteredRows.forEach(row => {
//       options.add(row.values[id])
//     })
//     return [...options.values()]
//   }, [id, preFilteredRows])

//   // Render a multi-select box
//   return (
//     <select
//       value={filterValue}
//       onChange={e => {
//         setFilter(e.target.value || undefined)
//       }}
//     >
//       <option value="">All</option>
//       {options.map((option, i) => (
//         <option key={i} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   )
// }

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
// function SliderColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the min and max
//   // using the preFilteredRows

//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//     preFilteredRows.forEach(row => {
//       min = Math.min(row.values[id], min)
//       max = Math.max(row.values[id], max)
//     })
//     return [min, max]
//   }, [id, preFilteredRows])

//   return (
//     <>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={filterValue || min}
//         onChange={e => {
//           setFilter(parseInt(e.target.value, 10))
//         }}
//       />
//       <button onClick={() => setFilter(undefined)}>Off</button>
//     </>
//   )
// }

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
// function NumberRangeColumnFilter({
//   column: { filterValue = [], preFilteredRows, setFilter, id },
// }) {
//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//     preFilteredRows.forEach(row => {
//       min = Math.min(row.values[id], min)
//       max = Math.max(row.values[id], max)
//     })
//     return [min, max]
//   }, [id, preFilteredRows])

//   return (
//     <div
//       style={{
//         display: 'flex',
//       }}
//     >
//       <input
//         value={filterValue[0] || ''}
//         type="number"
//         onChange={e => {
//           const val = e.target.value
//           setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
//         }}
//         placeholder={`Min (${min})`}
//         style={{
//           width: '70px',
//           marginRight: '0.5rem',
//         }}
//       />
//       to
//       <input
//         value={filterValue[1] || ''}
//         type="number"
//         onChange={e => {
//           const val = e.target.value
//           setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
//         }}
//         placeholder={`Max (${max})`}
//         style={{
//           width: '70px',
//           marginLeft: '0.5rem',
//         }}
//       />
//     </div>
//   )
// }

// function fuzzyTextFilterFn(rows, id, filterValue) {
//   return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
// }

// Let the table remove the filter if the string is empty
// fuzzyTextFilterFn.autoRemove = val => !val



// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data, customFilters, SubComponent }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      ...customFilters,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    [customFilters]
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      // Cell: EditableCell,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: {
      pageIndex,
      pageSize,
      // sortBy,
      // groupBy,
      // expanded,
      // filters,
      // selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      // updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      // autoResetPage: !skipReset,
      // autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    // useRowSelect,
    // Here we will use a plugin to add our selection column
    // hooks => {
    //   hooks.visibleColumns.push(columns => {
    //     return [
    //       // {
    //       //   id: 'selection',
    //       //   // Make this column a groupByBoundary. This ensures that groupBy columns
    //       //   // are placed after it
    //       //   groupByBoundary: true,
    //       //   // The header can use the table's getToggleAllRowsSelectedProps method
    //       //   // to render a checkbox
    //       //   Header: ({ getToggleAllRowsSelectedProps }) => (
    //       //     <div>
    //       //       <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //       //     </div>
    //       //   ),
    //       //   // The cell can use the individual row's getToggleRowSelectedProps method
    //       //   // to the render a checkbox
    //       //   Cell: ({ row }) => (
    //       //     <div>
    //       //       <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //       //     </div>
    //       //   ),
    //       // },
    //       ...columns,
    //     ]
    //   })
    // }
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="table table-hover table-bordered">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} scope="col">
                  <div>
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter && !column?.hideFilter === true ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Fragment key={index}>
                <tr className={row.isExpanded ? "table-active" : (index % 2 === 0 ? "striped" : "")} {...row.getRowProps()} {...row.getToggleRowExpandedProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="align-middle">
                        {cell.render('Cell',)}
                      </td>
                    )
                  })}
                </tr>
                  {row.isExpanded ? (
                    <tr className="no-hover">
                      <td colSpan={visibleColumns.length}>
                        {SubComponent({row})}
                      </td>
                    </tr>) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      {/* <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<< first'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'< previous'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'next >'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'last >>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
      <div className="row">
        <div className="col-9">
          <ul className="pagination">
            <li className={canPreviousPage? "page-item" : "page-item disabled"}>
              <span className="page-link" onClick={() => previousPage()} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </span>
            </li>
            {
              Array.from({length: pageCount}, (_, index) => index + 1).map(index => (
                <Fragment key={"paginationPage" + index}>
                  <li className={pageIndex + 1 === index? "page-item active" : "page-item"}>
                    <span className="page-link" onClick={pageIndex + 1 !== index? (() => gotoPage(index - 1)) : null}>
                      {index}
                      {pageIndex + 1 === index? <span className="sr-only">(current)</span> : null}
                    </span>
                  </li>
                </Fragment>
              ))
            }
            <li className={canNextPage? "page-item" : "page-item disabled"}>
              <span className="page-link" onClick={() => nextPage()} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="col">
          <div className="btn-group float-right">
            {[10, 25, 50, 100].map((size, index) => (
              <Fragment key={"perPageButton" + index}>
                <button
                  type="button"
                  className={pageSize === size? "btn btn-outline-secondary active" : "btn btn-outline-secondary"}
                  onClick={() => setPageSize(Number(size))}
                >
                  {size}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'



function DataTable(props) {

  return (
    <>
      <Table
        columns={props.columns}
        data={props.data}
        SubComponent={props.SubComponent}
        customFilters={props.customFilters}
      />
    </>
  )
}

export default DataTable
