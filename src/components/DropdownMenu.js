import styles from "../styles/dropdown.module.css";
const DropdownMenu = (props) => {
  const { isOpened, setIsOpened, children } = props;
  return (
    <div className={styles.dropdown}>
      <img
        onClick={() => setIsOpened(!isOpened)}
        className={styles.dropdownIcon}
        src="https://cdn-icons-png.flaticon.com/512/8212/8212730.png"
      />
      {isOpened && <div className={styles.menu}>{children}</div>}
    </div>
  );
};
export default DropdownMenu;
