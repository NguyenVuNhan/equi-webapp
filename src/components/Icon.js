import { useDynamicSVGImport } from "../hooks";
import PropTypes from "prop-types";

const Icon = ({ name, onCompleted, onError, ...rest }) => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(name, {
    onCompleted,
    onError,
  });

  if (error) {
    return error.message;
  }

  if (loading) {
    return "Loading...";
  }

  if (SvgIcon) {
    return <SvgIcon {...rest} />;
  }
  return null;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  onError: PropTypes.func,
};

export default Icon;
