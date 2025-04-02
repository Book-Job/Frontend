import PropTypes from 'prop-types'

const SortDropdown = ({ options, selected, onChange, className }) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={`outline-none ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

SortDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

SortDropdown.defaultProps = {
  className: '',
}

export default SortDropdown
