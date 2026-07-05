const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Get all tasks
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Add task
router.post("/", async (req, res) => {
  try {
    const { title, priority } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          completed: false,
          priority,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Update task title
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .update({ title })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Toggle completed
router.put("/complete/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Delete task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Task deleted successfully" });
});

module.exports = router;