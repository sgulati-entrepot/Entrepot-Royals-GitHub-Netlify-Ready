CREATE TABLE recl5_auction (
  id integer PRIMARY KEY CHECK (id = 1),
  document jsonb NOT NULL,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
