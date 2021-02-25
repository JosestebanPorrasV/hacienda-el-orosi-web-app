import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeeStartLoading } from "../../actions/LendAction";

import Swal from "sweetalert2";
import Modal from "react-modal";