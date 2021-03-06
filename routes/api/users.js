const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Board = require("../../models/Board");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/memory/:id", async (req, res) => {
  const id = req.params.id;
  // Find user by id
  User.findOne({ _id: id }).then(user => {
    // console.log("GET -> ",user.memory);
    return res.json(user.memory);
  });
});

router.post("/memory/:id", (req, res) => {
  const id = req.params.id;
  const tempmemory = req.body;
  // // Find user by _id
  User.findOneAndUpdate({
    _id: id
  },
    {
      $set: { memory: tempmemory }
    }).then(user => {
      return res.json(user);
    });
});

router.get("/score/:id", async (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }).then(user => {
    // console.log("GET Score -> ", user);
    return res.json(user);
  });
});

router.post("/score/:id", (req, res) => {
  const id = req.params.id;
  const tempplayer = req.body.player;
  const tempcomputer = req.body.computer;
  // // Find user by _id
  User.findOneAndUpdate({
    _id: id
  },
    {
      $set: {
        player: tempplayer,
        computer: tempcomputer
      }
    }).then(user => {
      return res.json(user);
    }).catch;
});

//Reset score and memory in database
//Score

router.post("/resetscore/:id", (req, res) => {
  const id = req.params.id;
  // // Find user by _id
  User.findOneAndUpdate({
    _id: id
  },
    {
      $set: {
        player: 0,
        computer: 0
      }
    }).then(user => {
      return res.json(user);
    }).catch(user => {
      return res.json(user);
    });
});

//Memory

router.post("/resetmemory/:id", (req, res) => {
  const id = req.params.id;
  // // Find user by _id
  User.findOneAndUpdate({
    _id: id
  },
    {
      $set: {
        memory: []
      }
    }).then(user => {
      return res.json(user);
    }).catch(user => {
      return res.json(user);
    });
});

router.post("/boards/", (req, res) => {
  console.log('POST board ->', req.body.board);
  Board.findOne({
    board: req.body.board
  }).then(board => {
    if (board) {
      console.log('board already exists...');
      return res.status(404);
    } else {
      console.log('creating new board...');
      const newBoard = new Board({
        board: req.body.board,
        moves: req.body.moves
      });
      newBoard
        .save()
        .then(board => {
          res.json(board);
          console.log('fullMem saved...');
        })
        .catch(err => console.log(err));
    }
  });
});

router.get("/boards/", async (req, res) => {
  Board.find({}).then(data => {
    console.log('data', data);
    return res.json(data);
  })
    .catch(err => console.log(err));
});

module.exports = router;