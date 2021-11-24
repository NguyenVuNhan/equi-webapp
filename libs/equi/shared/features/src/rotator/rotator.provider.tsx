import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { ClickEvent, RotatorContext } from './rotator.context';
import { setClicked } from './rotator.event';

export interface RotatorProviderProps {
  children: ReactNode;
}

const wsUri = 'ws://localhost:8765';

const onRotateEvent =
  (isLeft = false) =>
  (pos: number) => {
    let newPos = pos + (isLeft ? -2 : 2);
    newPos %= 360;
    newPos = newPos < 0 ? 360 + newPos : newPos;
    return newPos;
  };

export function RotatorProvider(props: RotatorProviderProps) {
  const { children } = props;
  const webSocket = useRef<WebSocket>();
  const history = useHistory();

  const [dialPosition, setDialPosition] = useState(0);
  const [connected, setConnected] = useState(false);

  const handleClick = useCallback((event: ClickEvent) => {
    switch (event) {
      case 'rotateRightEvent':
        setDialPosition(onRotateEvent());
        break;
      case 'rotateLeftEvent':
        setDialPosition(onRotateEvent(true));
        break;
      case 'holdEvent':
        history.goBack();
        break;
      case 'clickEvent':
        setClicked();
        break;
      case 'doubleClickEvent':
        history.push('/menu');
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    webSocket.current = new WebSocket(wsUri);

    webSocket.current.onopen = function (_evt) {
      setConnected(true);
      console.log('CONNECTED');
    };

    webSocket.current.onclose = function (_evt) {
      setConnected(false);
      console.log('DISCONNECTED');
    };

    webSocket.current.onmessage = async function (evt) {
      handleClick(evt.data);
    };

    webSocket.current.onerror = function (evt) {
      console.error('ERROR: ' + evt);
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  const value = useMemo(
    () => ({
      dialPosition,
      setDialPosition,
      handleClick,
    }),
    [dialPosition]
  );

  return (
    <RotatorContext.Provider value={value}>{children}</RotatorContext.Provider>
  );
}

export default RotatorProvider;
