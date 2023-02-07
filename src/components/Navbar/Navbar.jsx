import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import Basket from '../../assets/basket.svg'
import Heart from '../../assets/heart.svg'
import Person from '../../assets/person.svg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { NavLink, Link, useLocation, Navigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getPosts } from '../../redux/features/postSlice'
import { RxHamburgerMenu } from 'react-icons/rx'
import './Navbar.css'
//
import { Provider, History, Trigger } from 'react-history-search'

//

function NavBar({ totalItems }) {
  const navigate = useNavigate()
  const [click, setClick] = useState(false)
  const [prodId, setProdId] = useState('')
  const [search, setSearch] = useState('')
  const [clickedSearch, setClickedSearch] = useState('')
  const [burgerToggle, setBurgerToggle] = useState(false)

  const [searchHistory, setSearchHistory] = useState(
    localStorage.getItem('searched')?.split(',') || [],
  )
  const [searched, setSearched] = useState([])

  const auth = localStorage.getItem('commercejs_customer_id') ? true : false

  const { posts, loading } = useSelector((state) => state.posts)

  // ! search history

  const handleSearchHistory = (value, e) => {
    searchHistory.length <= 4
      ? setSearchHistory((searchHistory) => [...searchHistory, value])
      : setSearchHistory((searchHistory) => [...searchHistory.slice(1), value])
  }

  useEffect(() => {
    !searchHistory.length == 0 &&
      localStorage.setItem('searched', searchHistory)

    setSearched(localStorage.getItem('searched'))
  }, [searchHistory])
  const clearSearchHistory = () => {
    localStorage.removeItem('searched')
    setSearchHistory([])
  }

  // !search

  const inputRef = useRef()
  const onClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setClick(false)
    }
  }

  document.addEventListener('click', onClick)

  const handle = (e) => {
    setSearch(e.target.value)
    !e.target.value == 0 && localStorage.setItem('searchValue', e.target.value)
  }

  // !

  // ! handle burger

  //!

  const location = useLocation()

  function isActive(active) {
    return { color: active ? '#00D68F' : '' }
  }

  return (
    <>
      <div className="navbar">
        {/* <form className="inputForm" action="" onSubmit={handleSearch}>
                  <input id="navbar-search" placeholder="Axtarış" /> */}

        {/* </form> */}

        <div className="searchBar-input-result" ref={inputRef}>
          <form
            id="searchBarForm"
            autocomplete="off"
            action=""
            onSubmit={(e) => {
              handleSearchHistory(e.target[0].value)
              e.preventDefault()
              navigate('/search')
              setClick(false)
              document.getElementById('searchBarForm').reset()
            }}
          >
            <input
              defaultValue={clickedSearch}
              id="search-navbar"
              placeholder="Axtarış"
              onChange={handle}
              onFocus={() => {
                setClick(true)
              }}
              onClick={() => {
                setClick(true)
              }}
              className={burgerToggle ? 'd-none ' : ''}
            />
          </form>

          <div className={click ? 'searchBarResult' : ' d-none'}>
            <div className="searchBarHistory">
              {searchHistory?.map((el) => (
                <div
                  className="searchedEl"
                  onClick={() => {
                    setClickedSearch(el)
                    localStorage.setItem('searchValue', el)
                    setSearch(el)
                  }}
                >
                  {el}
                </div>
              ))}
            </div>

            <div className="searchBarHeader">
              <p>Nəticələr</p>
              <p
                onClick={() => {
                  clearSearchHistory()
                }}
              >
                Təmizlə
              </p>
            </div>
            <div className="searchedResultsDiv">
              {posts?.data?.map((el) =>
                el.name.toUpperCase().includes(search.toUpperCase()) ? (
                  <Link
                    to={`/prod/${el.id}`}
                    onInput={() => {
                      setClick(true)
                    }}
                    onClick={() => {
                      location.reload()
                    }}
                  >
                    <div className="resultItem">
                      <div className="seachResultImg">
                        <img src={el?.image?.url} alt="" />
                      </div>
                      <div className="resultProps">
                        <p>{el.name}</p>
                        <p>{el.price.formatted_with_symbol}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <p></p>
                ),
              )}
            </div>
            <div className="searchResViewAll">
              <div>
                <Link
                  to="/search"
                  onClick={() => {
                    setClick(false)
                  }}
                >
                  Hamısına bax
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" d-lg-none  d-md-none d-xl-none " id="burger">
          <DropdownButton
            onClick={(prev) => {
              setBurgerToggle(!burgerToggle)
              console.log(burgerToggle)
            }}
            className="burger-btn"
            id="dropdown-basic-button "
            title={<RxHamburgerMenu />}
          >
            <div className="burger-show">
              <Dropdown.Item>
                <Link to="/categories/apple">Apple</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/samsung">Samsung</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/xiomi">Xiaomi</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/redme">Redmi</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/allBrends">Bütün brendlər</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/accsesories">Aksesuarlar</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/categories/sales">Endirimlər</Link>
              </Dropdown.Item>
            </div>
          </DropdownButton>
        </div>
        <div className="fixedNavbar">
          <div className="navbarContainer">
            <Row className="burgerContainer">
              <Col
                id="burger"
                xs={2}
                sm={2}
                className=" d-lg-none  d-md-none d-xl-none "
              ></Col>
              <Col id="logoCol" md={3} xl={3} lg={3} sm={4} xs={4}>
                <Link to="/">
                  <div className="logo">
                    <img
                      id="logo"
                      src={Logo}
                      alt=""
                      style={{ width: '130px' }}
                    />
                  </div>
                </Link>
              </Col>
              <Col
                md={5}
                xl={5}
                lg={5}
                xs={{ span: 12, order: 2 }}
                sm={{ span: 12, order: 2 }}
              ></Col>
              <Col
                xl={{ span: 3, order: 3 }}
                lg={{ span: 3, order: 3 }}
                xs={6}
                sm={6}
                className="infoPanelContainer"
              >
                <div className="infoPanel">
                  <Link
                    to={
                      localStorage.getItem('commercejs_customer_token')
                        ? '/profile/orders'
                        : '/signup'
                    }
                  >
                    <img src={Person} alt="" />
                  </Link>
                  <Link to="/favorites">
                    <img src={Heart} alt="" />
                  </Link>
                  {location.pathname !== '/cart' && (
                    <div className="basket">
                      <Link to={auth ? '/cart ' : '/login'}>
                        <img src={Basket} alt="" />
                      </Link>
                      <div className={auth ? 'basketCount ' : 'd-none'}>
                        {totalItems}
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-center gap-7">
                <ul className="productCategories ">
                  <NavLink
                    className="text-black"
                    to="/categories/newphones"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Yeni
                  </NavLink>

                  <NavLink
                    className="text-black"
                    to="/categories/apple"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Apple
                  </NavLink>
                  <NavLink
                    className="text-black"
                    to="/categories/samsung"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Samsung
                  </NavLink>
                  <NavLink
                    className="text-black"
                    to="/categories/xiaomi"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Xiaomi
                  </NavLink>
                  <NavLink
                    className="text-black"
                    to="/categories/redme"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Redme
                  </NavLink>

                  <NavLink
                    className="text-black"
                    to="/categories/allBrends"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Bütün brendlər
                  </NavLink>

                  <NavLink
                    className="text-black"
                    to="/categories/accsesories"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Aksesuarlar
                  </NavLink>
                  <NavLink
                    className="text-black"
                    to="/categories/sales"
                    style={(obj) => {
                      return isActive(obj.isActive)
                    }}
                    end
                  >
                    Endirimlər
                  </NavLink>
                </ul>
              </Col>
            </Row>
          </div>
          <hr className="NavHr" />
        </div>
      </div>
    </>
  )
}

export default NavBar
